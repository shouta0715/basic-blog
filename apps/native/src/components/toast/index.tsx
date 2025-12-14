import {
  Toast,
  ToastComponentProps,
  ToastShowConfig,
  ToastVariant,
  useToast as useToastNative,
} from "heroui-native";
import React from "react";
import { View } from "react-native";
import { XIcon } from "../icons/x";
import { cn } from "@/utils/cn";

type BaseToastProps = ToastComponentProps & {
  config: ToastShowConfig;
};

type ToastShowOptions = Omit<
  ToastShowConfig,
  "variant" | "actionLabel" | "onActionPress"
>;

const variantColorMap = {
  accent: {
    label: cn("text-accent"),
    root: cn("border-accent-soft border-2"),
  },
  danger: {
    label: cn("text-danger"),
    root: cn("border-danger-soft border-2"),
  },
  success: {
    label: cn("text-success"),
    root: cn("border-success-soft border-2"),
  },
  warning: {
    label: cn("text-warning"),
    root: cn("border-warning-soft border-2"),
  },
  default: {
    label: cn("text-default"),
    root: cn("border-default-soft border-2"),
  },
} satisfies Record<ToastVariant, Record<"label" | "root", string>>;

const BaseToast = (props: BaseToastProps) => (
  <Toast
    className={cn(
      variantColorMap[props.config.variant ?? "default"].root,
      "relative flex-row gap-x-2 border-2 p-4",
    )}
    variant={props.config.variant}
    {...props}
  >
    {props.config.icon && (
      <View className="mt-1 shrink-0">{props.config.icon}</View>
    )}
    <View className="flex-1">
      <Toast.Title
        className={cn(
          variantColorMap[props.config.variant ?? "default"].label,
          "font-semibold",
        )}
      >
        {props.config.label}
      </Toast.Title>
      {props.config.description && (
        <Toast.Description className="text-default-foreground text-sm">
          {props.config.description}
        </Toast.Description>
      )}
      <Toast.Close
        className="absolute -right-2 -top-2"
        onPress={() => props.hide()}
      >
        <XIcon />
      </Toast.Close>
    </View>
  </Toast>
);

export function useToast() {
  const { toast } = useToastNative();

  const success = (options: ToastShowOptions) =>
    toast.show({
      ...options,
      component: (props) => (
        <BaseToast {...props} config={{ variant: "success", ...options }} />
      ),
    });

  const error = (options: ToastShowOptions) =>
    toast.show({
      ...options,
      component: (props) => (
        <BaseToast {...props} config={{ variant: "danger", ...options }} />
      ),
    });

  const toastActions = {
    ...toast,
    success,
    error,
  };

  return { toast: toastActions };
}
