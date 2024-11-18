import React from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";

interface ToolbarProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  markdownStyles: { name: string }[];
  onConvert: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedStyle,
  setSelectedStyle,
  markdownStyles,
  onConvert,
}) => {
  return (
    <>
      <Select
        className="w-full"
        classNames={{
          trigger: "rounded-lg",
          value: "text-gray-600",
          label: "text-gray-500 font-medium",
          listboxWrapper: "rounded-lg !bg-transparent",
          base: "!bg-transparent",
          mainWrapper: "!bg-transparent",
        }}
        disallowEmptySelection={true}
        label="选择 Markdown 样式"
        listboxProps={{
          className: "max-h-[200px] overflow-auto rounded-lg !bg-transparent",
        }}
        popoverProps={{
          classNames: {
            base: "!z-[9999] !shadow-none",
            content: "!bg-transparent !shadow-none",
          },
        }}
        radius="lg"
        selectedKeys={[selectedStyle]}
        variant="bordered"
        onChange={(e) => setSelectedStyle(e.target.value)}
      >
        {markdownStyles.map((style) => (
          <SelectItem
            key={style.name}
            className="hover:bg-gray-100/80 transition-colors duration-150 !bg-white/70"
            value={style.name}
          >
            {style.name}
          </SelectItem>
        ))}
      </Select>
      <Button
        className="w-full"
        color="primary"
        variant="flat"
        onClick={onConvert}
      >
        转换
      </Button>
    </>
  );
};
