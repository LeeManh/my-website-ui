"use client";

import { Form, type FormItemProps } from "antd";
import styles from "./CustomFormItem.module.scss";
import clsx from "clsx";

interface CustomFormItemProps extends FormItemProps {}

const CustomFormItem = ({ className, ...props }: CustomFormItemProps) => {
  return <Form.Item {...props} className={clsx(styles.customFormItem, className)} />;
};

export default CustomFormItem;
