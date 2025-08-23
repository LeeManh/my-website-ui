import { Button, Divider, Input, InputRef, Select } from "antd";
import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface SelectAndCreateProps {
  items: string[];
  setItems: (items: string[]) => void;
  placeholder?: string;
  placeholderInMenu?: string;
}

export const SelectAndCreate = ({
  items,
  setItems,
  placeholder,
  placeholderInMenu,
}: SelectAndCreateProps) => {
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      allowClear
      mode="multiple"
      style={{ width: "100%" }}
      placeholder={placeholder}
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <div className="flex items-center gap-2 px-2 py-1">
            <Input
              placeholder={placeholderInMenu}
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={addItem} disabled={!name}>
              Add item
            </Button>
          </div>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};
