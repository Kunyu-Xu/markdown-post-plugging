import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { CopyButtonGroup } from "./copy-button-group";
import { DownloadButtonGroup } from "./download-button-group";

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
    <div className="flex gap-4 items-center mb-4">
      <Select
        label="选择样式"
        selectedKeys={[selectedStyle]}
        onChange={(e) => setSelectedStyle(e.target.value)}
      >
        {markdownStyles.map((style) => (
          <SelectItem key={style.name} value={style.name}>
            {style.name}
          </SelectItem>
        ))}
      </Select>
      <CopyButtonGroup />
      <DownloadButtonGroup />
    </div>
  );
}; 