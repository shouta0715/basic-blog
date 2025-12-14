import { TextField } from "heroui-native";
import { ComponentProps, useId } from "react";
import { FormItemContext, useFormField } from "./form-filed";
import { cn } from "@/utils/cn";

function TextFormItem({
  className,
  ...props
}: Omit<ComponentProps<typeof TextField>, "className" | "isInvalid"> & {
  className?: string;
}) {
  const id = useId();
  const { error } = useFormField();

  return (
    <FormItemContext value={{ id }}>
      <TextField
        className={className}
        isInvalid={!!error}
        nativeID={id}
        {...props}
      />
    </FormItemContext>
  );
}

function TextFormLabel({
  className,
  ...props
}: Omit<ComponentProps<typeof TextField.Label>, "className"> & {
  className?: string;
}) {
  const { formItemId } = useFormField();

  return (
    <TextField.Label
      className={cn("text-sm", className)}
      nativeID={formItemId}
      {...props}
    />
  );
}

function TextFieldDescription({
  className,
  ...props
}: Omit<ComponentProps<typeof TextField.Description>, "className"> & {
  className?: string;
}) {
  const { formDescriptionId } = useFormField();

  return (
    <TextField.Description
      className={cn("text-sm", className)}
      nativeID={formDescriptionId}
      {...props}
    />
  );
}

function TextFieldErrorMessage({
  className,
  ...props
}: Omit<
  ComponentProps<typeof TextField.ErrorMessage>,
  "className" | "children"
> & {
  className?: string;
}) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : null;

  if (!body) {
    return null;
  }

  return (
    <TextField.ErrorMessage
      className={cn("text-destructive text-sm", className)}
      nativeID={formMessageId}
      {...props}
    >
      {body}
    </TextField.ErrorMessage>
  );
}

const TextFormInput = TextField.Input;
const TextFormInputStartContent = TextField.InputStartContent;
const TextFormInputEndContent = TextField.InputEndContent;

export {
  TextFormItem,
  TextFormLabel,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFormInput,
  TextFormInputStartContent,
  TextFormInputEndContent,
};
