import React, { useState, useMemo, useEffect, useRef } from "react";

enum BootstrapBtnVariant {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Light = "light",
  Dark = "dark",
}

interface Props {
  className?: string;
  handleWidth?: number;
  value?: boolean;
  disabled?: boolean;
  onChange?: Function;
  onCaption?: React.ReactNode;
  offCaption?: React.ReactNode;
  onVariant?: BootstrapBtnVariant;
  offVariant?: BootstrapBtnVariant;
}

function Toggle({
  handleWidth = 30,
  className = "",
  value = false,
  disabled = false,
  onChange,
  onCaption = "ON",
  offCaption = "OFF",
  onVariant = BootstrapBtnVariant.Primary,
  offVariant = BootstrapBtnVariant.Light,
}: Props) {
  const [enableTransition, setEnableTransition] = useState(false);
  const [checked, setChecked] = useState<boolean>(value);
  const onCaptionRef = useRef<HTMLSpanElement>(null);
  const offCaptionRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();
  useEffect(() => {
    const timer = setTimeout(() => setEnableTransition(true), 300);
    return () => clearTimeout(timer);
  }, [setEnableTransition]);
  useEffect(() => {
    const newWidth = Math.max.apply(
      null,
      [onCaptionRef, offCaptionRef].map(
        ({ current }) => current?.offsetWidth || 0
      )
    );
    setWidth(newWidth);
  }, [onCaption, offCaption, setWidth]);
  const onClick = () => {
    setChecked(!checked);
    if (typeof onChange === "function") {
      onChange(!checked);
    }
  };

  const styles = useMemo(() => {
    if (!width) {
      return {};
    }
    return {
      toggle: {
        width: width + handleWidth,
      },
      container: {
        marginLeft: checked ? 0 : -1 * width,
      },
      caption: {
        width,
      },
    };
  }, [width, checked, handleWidth]);

  const toggleClassName = [
    "btn p-0 border overflow-hidden bootstrap-toggle",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button
      className={toggleClassName}
      style={styles.toggle}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={`text-nowrap ${enableTransition ? "animate" : ""}`}
        style={styles.container}
      >
        <span
          className={`d-inline-block caption btn-${onVariant}`}
          style={styles.caption}
          ref={onCaptionRef}
        >
          {onCaption}
        </span>
        <span
          className="d-inline-block handle bg-white text-light"
          style={{ width: handleWidth }}
        >
          ||
        </span>
        <span
          className={`d-inline-block caption btn-${offVariant}`}
          style={styles.caption}
          ref={offCaptionRef}
        >
          {offCaption}
        </span>
      </span>
    </button>
  );
}

export default Toggle;
