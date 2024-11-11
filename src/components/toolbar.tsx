import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface ToolbarProps {
  selectedStyle: string;
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>;
  markdownStyles: { name: string }[];
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedStyle,
  setSelectedStyle,
  markdownStyles,
}) => {
  return (
    <div className="w-[250px] h-[250px]">
      <Select
        label="选择 Markdown 样式"
        className="w-full"
        disallowEmptySelection={true}
        selectedKeys={[selectedStyle]}
        onChange={(e) => setSelectedStyle(e.target.value)}
      >
        {markdownStyles.map((style) => (
          <SelectItem key={style.name} value={style.name}>
            {style.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}; 