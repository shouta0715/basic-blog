import { UserSignUpSchema } from "@package/lib";
import { Button } from "heroui-native";
import React from "react";
import { FieldPath } from "react-hook-form";
import { View } from "react-native";
import { useSignUpForm } from "../hooks/use-sing-up-form";
import { PasswordToggleButton } from "./password-toggle-button";
import { Form, FormItem } from "@/components/form/form-filed";
import {
  TextFieldErrorMessage,
  TextFormInput,
  TextFormInputEndContent,
  TextFormItem,
  TextFormLabel,
} from "@/components/form/text-form-field";

export function SignUpForm() {
  const { form, handleSubmit, isPasswordVisible, togglePasswordVisibility } =
    useSignUpForm();

  const onFocusNextInput = (nextInputName: FieldPath<UserSignUpSchema>) => () =>
    form.setFocus(nextInputName);

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

        <Button className="mt-6" onPress={handleSubmit}>
          <Button.Label className="font-bold">登録する</Button.Label>
        </Button>
      </Form>
    </View>
  );
}
