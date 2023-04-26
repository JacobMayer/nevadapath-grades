import { Children } from "react";
import { MenuListProps } from "react-select";

import { Center, Text } from "@mantine/core";
import { FixedSizeList as List } from "react-window";

const MenuList = ({
  children,
  maxHeight,
  getValue,
}: MenuListProps<any, boolean>) => {
  const height = 41;
  const childrenOptions = Children.toArray(children);
  const [value] = getValue() as { value: number; label: string }[];
  const wrapperHeight =
    maxHeight < childrenOptions.length * height
      ? maxHeight
      : childrenOptions.length * height;

  let initialOffset = 0;
  if (typeof value !== "undefined") {
    initialOffset =
      value?.value >= 6 ? (value.value - 6) * height : value.value;
  }

  return (
    <List
      height={wrapperHeight}
      width="100%"
      itemCount={childrenOptions.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div style={style}>
          {Array.isArray(children) ? (
            children[index]
          ) : (
            <Center>
              <Text size="md" color="grey" style={{ paddingTop: 7 }}>
                No options
              </Text>
            </Center>
          )}
        </div>
      )}
    </List>
  );
};

export default MenuList;
