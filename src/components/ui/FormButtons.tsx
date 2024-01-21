"use client";

import React, { useRef, useEffect } from "react";

interface FormButtonProps {
  mainClass: string;
  primaryClass: string;
  secondaryClass: string;
  secondaryLabelClass: string;
  primaryLabelClass: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  isLoading: boolean;
}

const FormButtons: React.FC<FormButtonProps> = ({
  mainClass,
  primaryClass,
  secondaryClass,
  secondaryLabelClass,
  primaryLabelClass,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  isLoading,
}) => {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        primaryButtonRef.current?.click();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className={mainClass}>
      <button
        type="button"
        disabled={isLoading}
        className={secondaryClass}
        onClick={onSecondaryClick}
      >
        <span className={secondaryLabelClass}>{secondaryLabel}</span>
      </button>
      <button
        type="button"
        className={primaryClass}
        onClick={onPrimaryClick}
        ref={primaryButtonRef}
      >
        <span className={primaryLabelClass}>{primaryLabel}</span>
      </button>
    </div>
  );
};

export default FormButtons;
