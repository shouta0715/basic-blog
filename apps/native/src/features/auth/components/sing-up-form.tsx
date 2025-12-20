import { UserSignUpSchema } from "@package/lib";
import { Button, Spinner, useThemeColor } from "heroui-native";
import React from "react";
import { FieldPath } from "react-hook-form";
import { View } from "react-native";
import { LinearTransition } from "react-native-reanimated";
import { match } from "ts-pattern";
import { useSignUpForm } from "../hooks/use-sign-up-form";
import { PasswordToggleButton } from "./password-toggle-button";
import { Form, FormItem } from "@/components/form/form-filed";
import {
  TextFieldErrorMessage,
  TextFormInput,
  TextFormInputEndContent,
  TextFormItem,
  TextFormLabel,
} from "@/components/form/text-form-field";
import { cn } from "@/utils/cn";

export function SignUpForm() {
  const {
    form,
    handleSubmit,
    isPasswordVisible,
    togglePasswordVisibility,
    status,
  } = useSignUpForm();

  const spinnerColor = useThemeColor("accent-foreground");

  const onFocusNextInput = (nextInputName: FieldPath<UserSignUpSchema>) => () =>
    form.setFocus(nextInputName);

  const isPending = status === "pending";

  return (
    <View className="gap-4">
      <Form {...form}>
        <FormItem
          control={form.control}
          name="name"
          render={({ field }) => (
            <TextFormItem isRequired>
              <TextFormLabel>名前</TextFormLabel>
              <TextFormInput
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
                placeholder="名前を入力してください"
                returnKeyLabel="next"
                returnKeyType="next"
                textContentType="name"
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                onSubmitEditing={onFocusNextInput("email")}
              />
              <TextFieldErrorMessage />
            </TextFormItem>
          )}
        />

        <FormItem
          control={form.control}
          name="email"
          render={({ field }) => (
            <TextFormItem isRequired>
              <TextFormLabel>メールアドレス</TextFormLabel>
              <TextFormInput
                autoCapitalize="none"
                autoComplete="username-new"
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

        <FormItem
          control={form.control}
          name="password"
          render={({ field }) => (
            <TextFormItem isRequired>
              <TextFormLabel>パスワード</TextFormLabel>
              <TextFormInput
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                placeholder="パスワードを入力してください"
                returnKeyType="next"
                secureTextEntry={!isPasswordVisible.password}
                textContentType="newPassword"
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                onSubmitEditing={onFocusNextInput("confirmPassword")}
              >
                <TextFormInputEndContent>
                  <PasswordToggleButton
                    isPasswordVisible={isPasswordVisible.password}
                    togglePasswordVisibility={togglePasswordVisibility(
                      "password",
                    )}
                  />
                </TextFormInputEndContent>
              </TextFormInput>
              <TextFieldErrorMessage />
            </TextFormItem>
          )}
        />

        <FormItem
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <TextFormItem isRequired>
              <TextFormLabel>パスワード確認</TextFormLabel>
              <TextFormInput
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                placeholder="パスワードを再入力してください"
                secureTextEntry={!isPasswordVisible.confirmPassword}
                textContentType="none"
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              >
                <TextFormInputEndContent>
                  <PasswordToggleButton
                    isPasswordVisible={isPasswordVisible.confirmPassword}
                    togglePasswordVisibility={togglePasswordVisibility(
                      "confirmPassword",
                    )}
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
            layout={LinearTransition.springify()
              .dampingRatio(1.5)
              .duration(200)}
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
                  登録が完了しました
                </Button.Label>
              ))
              .otherwise(() => (
                <Button.Label className="font-bold">登録する</Button.Label>
              ))}
          </Button>
        </View>
      </Form>
    </View>
  );
}
