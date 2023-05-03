import { Card, Text, Group, ActionIcon, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";

import { IconTrash } from "@tabler/icons-react";
import { gpaToGrade } from "../utils/utils";
import * as vars from "../variables/Variables";
import type { Grade } from "~/data/gradeType";
import RMPLink from "./RMPLink";

interface CourseInfo {
  color: string | undefined;
  course: string;
  index: number;
  stats: Grade;
  description: string;
  instructor: string | null;
  term: string;
}

export default function CourseCard(props: CourseInfo) {
  const theme = useMantineTheme();
  const router = useRouter();

  //console.log(props.stats["Course Average"], "stats1");

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  //console.log(props);

  const removeCourse = async (index: string) => {
    const query = router.query;

    const path = (query?.grade || query?.enrollment) as string;

    const routeKey = query?.grade ? "grades" : "enrollment";

    const courseIndices = path?.split("&");
    const newCourseIndices = courseIndices.filter(
      (i) => i.split("_")[0] !== index
    ); // Split by '_' and first item to get index of the query parameters
    await router.push(`/${routeKey}/${newCourseIndices.join("&")}`, undefined, {
      shallow: true,
    });
    //console.log(result, index);
  };

  return (
    <div style={{ width: 340, marginBottom: 25 }} className="min-w-max">
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          className="flex-nowrap"
        >
          <Group className="flex-nowrap">
            <ActionIcon
              variant="filled"
              size={15}
              color={props.color}
            ></ActionIcon>
            <Text
              weight={700}
              size="lg"
              color="#383838"
              className="flex-shrink-0"
            >
              {props.course}
            </Text>
          </Group>

          <ActionIcon
            variant="subtle"
            onClick={() => {
              removeCourse(props.index.toString())
                .then(() => {
                  // Handle successful removal
                  console.log("removed");
                })
                .catch((error) => {
                  // Handle error
                  console.log(error);
                });
            }}
          >
            <IconTrash size={16} color="#fc7676" />
          </ActionIcon>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {props.description}
        </Text>

        <Text
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5, paddingTop: 10 }}
        >
          {props.term}{" "}
          {String(props?.instructor) ? (
            <>
              •<RMPLink name={String(props?.instructor)} />
            </>
          ) : (
            ""
          )}
        </Text>
        <div className="block flex space-x-4 lg:hidden">
          <div>
            <Text
              fz="sm"
              weight={300}
              style={{ lineHeight: 0 }}
              mt="md"
              className="pb-1.5"
            >
              Course Average
            </Text>
            <div className="flex space-x-1">
              <Text
                className="pt-1"
                color={
                  vars.gradeColor[ // No grade
                    props.stats["Course Average"] != null
                      ? gpaToGrade(props.stats["Course Average"]!)
                      : "X"
                  ]
                }
              >
                {props.stats["Course Average"] != null
                  ? gpaToGrade(props.stats["Course Average"]!)
                  : ""}
              </Text>

              <Text fz="sm" weight={300} style={{ lineHeight: 0 }} mt="md">
                {props.stats["Course Average"]
                  ? `(GPA: ${props.stats["Course Average"]})`
                  : "N/A"}
              </Text>
            </div>
          </div>
          <div>
            <Text
              fz="sm"
              weight={300}
              style={{ lineHeight: 0 }}
              mt="md"
              className="pb-1.5"
            >
              Section Average
            </Text>
            <div className="flex space-x-1">
              <Text
                className="pt-1"
                color={
                  vars.gradeColor[ // No grade
                    props.stats["Section Average"] != null
                      ? gpaToGrade(props.stats["Section Average"]!)
                      : "X"
                  ]
                }
              >
                {props.stats["Section Average"] != null
                  ? gpaToGrade(props.stats["Section Average"]!)
                  : ""}
              </Text>

              <Text fz="sm" weight={300} style={{ lineHeight: 0 }} mt="md">
                {props.stats["Section Average"]
                  ? `(GPA: ${props.stats["Section Average"]})`
                  : "N/A"}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
