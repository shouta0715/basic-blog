import { UserSignInSchema } from "@package/lib";
import { Button, Spinner, useThemeColor } from "heroui-native";
import React from "react";
import { FieldPath } from "react-hook-form";
import { View } from "react-native";
import { LinearTransition } from "react-native-reanimated";
import { match } from "ts-pattern";
import { useSignInForm } from "../hooks/use-sign-in-form";
import { PasswordToggleButton } from "./password-toggle-button";
import { Form, FormController } from "@/components/form/form-filed";
import {
  TextFieldErrorMessage,
  TextFormInput,
  TextFormInputEndContent,
  TextFormItem,
  TextFormLabel,
} from "@/components/form/text-form-field";
import { cn } from "@/utils/cn";

export function SignInForm() {
  const {
    form,
    handleSubmit,
    isValid,
    isPasswordVisible,
    togglePasswordVisibility,
    status,
  } = useSignInForm();

  const spinnerColor = useThemeColor("accent-foreground");

  const onFocusNextInput = (nextInputName: FieldPath<UserSignInSchema>) => () =>
    form.setFocus(nextInputName);

  const isPending = status === "pending";

  return (
    <View className="gap-4">
      <Form {...form}>
        <FormController
          control={form.control}
          name="email"
          render={({ field }) => (
            <TextFormItem isRequired>
              <TextFormLabel>メールアドレス</TextFormLabel>
              <TextFormInput
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="メールアドレスを入力してください"
                returnKeyType="next"
                textContentType="username"
                onSubmitEditing={onFocusNextInput("password")}
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
              <TextFieldErrorMessage />
            </TextFormItem>
          )}
        />

        <FormController
          control={form.control}
          name="password"
          render={({ field }) => (
            <TextFormItem isRequired>
              <TextFormLabel>パスワード</TextFormLabel>
              <TextFormInput
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect={false}
                placeholder="パスワードを入力してください"
                returnKeyType="done"
                secureTextEntry={!isPasswordVisible}
                textContentType="password"
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                onSubmitEditing={handleSubmit}
              >
                <TextFormInputEndContent>
                  <PasswordToggleButton
                    isPasswordVisible={isPasswordVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </TextFormInputEndContent>
              </TextFormInput>
              <TextFieldErrorMessage />
            </TextFormItem>
          )}
        />

        <View className="mt-6 items-center justify-center">
          <Button
            className={cn(
              "transition-colors disabled:opacity-100",
              !isPending && "w-full",
            )}
            isDisabled={isPending || status === "success"}
            isIconOnly={isPending}
            layout={
              isValid
                ? LinearTransition.springify().dampingRatio(1.5).duration(200)
                : undefined
            }
            onPress={handleSubmit}
          >
            {match(status)
              .with("pending", () => (
                <Spinner color={spinnerColor}>
                  <Spinner.Indicator animation={{ rotation: { speed: 2 } }} />
                </Spinner>
              ))

              .with("success", () => (
                <Button.Label className="font-bold">
                  ログインしました
                </Button.Label>
              ))
              .otherwise(() => (
                <Button.Label className="font-bold">ログイン</Button.Label>
              ))}
          </Button>
        </View>
      </Form>
    </View>
  );
}
