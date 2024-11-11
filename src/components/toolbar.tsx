import React from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";

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
  onConvert
}) => {
  return (
    <div className="w-[250px] space-y-2">
      <Select
        label="选择 Markdown 样式"
        className="w-full"
        disallowEmptySelection={true}
        selectedKeys={[selectedStyle]}
        onChange={(e) => setSelectedStyle(e.target.value)}
        popoverProps={{
          classNames: {
            base: "!z-[9999] !shadow-none",
            content: "!bg-transparent !shadow-none"
          }
        }}
        listboxProps={{
          className: "max-h-[200px] overflow-auto rounded-lg !bg-transparent"
        }}
        classNames={{
          trigger: "rounded-lg",
          value: "text-gray-600",
          label: "text-gray-500 font-medium",
          listboxWrapper: "rounded-lg !bg-transparent",
          base: "!bg-transparent",
          mainWrapper: "!bg-transparent"
        }}
        variant="bordered"
        radius="lg"
      >
        {markdownStyles.map((style) => (
          <SelectItem 
            key={style.name} 
            value={style.name}
            className="hover:bg-gray-100/80 transition-colors duration-150 !bg-white/70"
          >
            {style.name}
          </SelectItem>
        ))}
      </Select>
      <Button 
        className="w-full"
        onClick={onConvert}
        color="primary"
        variant="flat"
      >
        转换
      </Button>
    </div>
  );
}; 