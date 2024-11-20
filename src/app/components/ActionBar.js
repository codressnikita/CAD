"use client";
import { ArchiveIcon, ChevronsLeft, Users2Icon } from "lucide-react";

export default function ActionBar({
  showConstituents,
  showArchive,
  backFromConstituent,
  backFromArchive,
  handleArchiveClick,
  handleConstituentClick,
  className,
}) {
  let leftButton = null;
  let rightButton = null;

  if (showConstituents) {
    leftButton = {
      text: "Back",
      icon: ChevronsLeft,
      onClick: backFromConstituent,
    };
    rightButton = {
      text: "Switch to Archive View",
      icon: ArchiveIcon,
      onClick: handleArchiveClick,
    };
  }

  if (showArchive) {
    leftButton = {
      text: "Back",
      icon: ChevronsLeft,
      onClick: backFromArchive,
    };
    rightButton = {
      text: "Switch to CA Members View",
      icon: Users2Icon,
      onClick: handleConstituentClick,
    };
  }

  if (!leftButton && !rightButton) {
    return null;
  }

  return (
    <div className={`bg-blue-600 p-2 flex justify-between ${className}`}>
      {leftButton && (
        <button
          className="bg-blue-700 text-white px-4 py-1 rounded flex items-center"
          onClick={leftButton.onClick}
        >
          {leftButton.icon && <leftButton.icon className="h-5 w-5 mr-2" />}
          {leftButton.text}
        </button>
      )}
      <div className="flex-grow" />
      {rightButton && (
        <button
          className="bg-blue-700 text-white px-4 py-1 rounded flex items-center"
          onClick={rightButton.onClick}
        >
          {rightButton.icon && <rightButton.icon className="h-5 w-5 mr-2" />}
          {rightButton.text}
        </button>
      )}
    </div>
  );
}
