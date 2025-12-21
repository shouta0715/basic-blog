import { LegendList, LegendListRenderItemProps } from "@legendapp/list";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { Button } from "heroui-native";
import { View } from "react-native";
import { Text } from "@/components/native/text";
import { articleCollection } from "@/db/articles/collections";
import { userCollection } from "@/db/users/collections";
import { authClient } from "@/lib/auth-client";

export default function Index() {
  const { data } = useLiveQuery((q) =>
    q
      .from({ articles: articleCollection })
      .innerJoin({ users: userCollection }, ({ articles, users }) =>
        eq(articles.authorId, users.id),
      )
      .select(({ articles, users }) => ({
        ...articles,
        author: users,
      })),
  );

  const renderItem = ({
    item,
  }: LegendListRenderItemProps<(typeof data)[number]>) => (
    <View className="flex-1 gap-2">
      <Text className="text-xl font-bold">{item.title}</Text>
      <View>
        <Text className="rounded bg-black p-4 text-sm text-white">
          {item.content}
        </Text>
      </View>
      <Text className="text-muted text-sm">{item.author.name}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white px-4">
      <Text className="text-2xl font-bold">記事一覧</Text>
      <View className="mt-4 flex-1">
        <LegendList
          recycleItems
          ItemSeparatorComponent={() => <View aria-hidden className="mt-4" />}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <Button
        className="mt-6"
        variant="danger"
        onPress={() => authClient.signOut()}
      >
        <Button.Label className="font-bold">Logout</Button.Label>
      </Button>
    </View>
  );
}
