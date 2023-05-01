import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Button, Grid } from "@mantine/core";
import MenuList from "./MenuList";
//import { courseTitles } from "../grades/courses";
import Select, { CSSObjectWithLabel, createFilter } from "react-select";
import CustomOption from "./customOptionSelect";
import Grades from "../data/grades.json";
import { GlobalContext } from "../contexts/AppContext";
import { binarySearch } from "../utils/binarySearch";
import type { GradesData } from "~/data/gradeType";

const GradesList = Grades as GradesData;

export function InputSelections() {
  //const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  //const [selectedSection, setSelectedSection] = useState(null);

  //const [selectedTerm, setSelectedTerm] = useState(null);
  const uniqueCourses = new Set<string>();

  type monthsType = {
    Spring: number;
    Summer: number;
    Fall: number;
  };

  for (const grade of GradesList.Grades) {
    let course = `${grade.Subject} ${grade.Number} ${grade.Ext}`;
    course = course.trim();
    uniqueCourses.add(course);
  }

  const courseTitles = Array.from(uniqueCourses);
  //console.log(courseTitles.length, "courseTitles.length");

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query

    //console.log(router.query);
    if (
      router.query.grade &&
      (router.query.grade as string).split("&").length >= 4
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [router.isReady, router.query]);

  // Always do navigations after the first render

  //console.log(useContext(GlobalContext));

  type SelectOption = {
    value: number | string;
    label: string;
  };

  type GlobalContextType = {
    selectedCourseIndex: SelectOption;
    setSelectedCourseIndex: React.Dispatch<React.SetStateAction<SelectOption>>;
    selectedSection: SelectOption;
    setSelectedSection: React.Dispatch<React.SetStateAction<SelectOption>>;
    selectedTerm: SelectOption;
    setSelectedTerm: React.Dispatch<React.SetStateAction<SelectOption>>;
  };

  const [
    selectedCourseIndex,
    setSelectedCourseIndex,
    selectedSection,
    setSelectedSection,
    selectedTerm,
    setSelectedTerm,
  ] = useContext(GlobalContext) as [
    selectedCourseIndex: SelectOption,
    setSelectedCourseIndex: React.Dispatch<
      React.SetStateAction<SelectOption | null>
    >,
    selectedSection: SelectOption,
    setSelectedSection: React.Dispatch<
      React.SetStateAction<SelectOption | null>
    >,
    selectedTerm: SelectOption,
    setSelectedTerm: React.Dispatch<React.SetStateAction<SelectOption | null>>
  ];

  //const [sections, setSections] = useState([]);

  const months: monthsType = { Spring: 1, Summer: 2, Fall: 3 };

  // const inx = binarySearch(
  //   Grades.Grades,
  //   selectedCourseIndex ? selectedCourseIndex.label : ""
  // );
  const inx = binarySearch(
    GradesList.Grades,
    selectedCourseIndex ? selectedCourseIndex.label : ""
  );

  const resetSectionTerm = () => {
    setSelectedSection(null);
    setSelectedTerm(null);
  };

  const regex = new RegExp(/.*\s.*\s(.*)/); // Matches for course extentions

  //console.log(selectedCourseIndex, inx);

  const sections = Array.from(
    new Set(
      selectedCourseIndex
        ? inx
            .filter((i) =>
              regex.test(selectedCourseIndex.label)
                ? GradesList.Grades[i]!.Ext ===
                  selectedCourseIndex.label.slice(
                    selectedCourseIndex.label.lastIndexOf(" ") + 1
                  )
                : GradesList.Grades[i]!.Ext === ""
            )
            .map((i) => GradesList.Grades[i]!.Section)
            .sort()
        : []
    ).values()
  );

  /*

  const sections = [
    ...new Set(
      selectedCourseIndex
        ? inx
            .filter((i) =>
              regex.test(selectedCourseIndex.label)
                ? Grades.Grades[i].Ext ===
                  selectedCourseIndex.label.slice(
                    selectedCourseIndex.label.lastIndexOf(" ") + 1
                  )
                : Grades.Grades[i].Ext === ""
            )
            .map((i) => Grades.Grades[i].Section)
            .sort()
        : []
    ),
  ];
  */

  const terms = Array.from(
    selectedSection
      ? Array.from(new Set<number>(inx))
          .filter(
            (i) =>
              GradesList.Grades[i]!.Section.toString() ===
              selectedSection.label.toString()
          )
          .map((i) => {
            //console.log(i, Grades.Grades[i].Term, "LOOK <-------------");
            return { value: i, label: GradesList.Grades[i]!.Term };
          })
          .sort((a, b) => {
            const aa: string[] = a.label.split(" ");
            const bb: string[] = b.label.split(" ");

            if (typeof aa[1] === "undefined" || typeof bb[1] === "undefined") {
              return 0;

              //return bb[1] - aa[1] || months[bb[0]] - months[aa[0]];
            }

            return (
              parseInt(bb[1]) - parseInt(aa[1]) ||
              months[bb[0] as keyof monthsType] -
                months[aa[0] as keyof monthsType]
            );
          })
      : []
  );

  /*

  const terms = [
    ...new Set(
      selectedSection
        ? inx
            .filter((i) => Grades.Grades[i].Section === selectedSection.label)
            .map((i) => {
              return { value: i, label: Grades.Grades[i].Term };
            })
            .sort((a, b) => {
              const aa = a.label.split(" ");
              const bb = b.label.split(" ");
              return bb[1] - aa[1] || months[bb[0]] - months[aa[0]];
            })
        : []
    ),
  ];
  */
  // console.log(sections, terms);

  //  When the component first loads, we need to iterate through data values and add each to the search index.

  const customStyles = {
    option: (provided: CSSObjectWithLabel, state: { isSelected: boolean }) => ({
      ...provided,
      "&:hover": {
        background: state.isSelected ? "#2684FF" : "#deebff",
      },
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: "#595959", // customize placeholder color here
    }),
  };

  const filterConfig = {
    //ignoreCase: false,
    ignoreAccents: false,
    //trim,
    //matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
  };

  return (
    <Grid className="px-6" grow>
      <Grid.Col xs={7} sm={6} md={3} lg={3}>
        <Select
          instanceId="course-select"
          components={{
            Option: CustomOption,
            MenuList: MenuList,
          }}
          //filterOption={createFilter({ ignoreAccents: false })}
          //ignoreAccents={false}
          filterOption={createFilter(filterConfig)}
          //noOptionsMessage={() => "No options"}
          captureMenuScroll={false}
          isClearable={true}
          value={selectedCourseIndex}
          onChange={(change) => {
            setSelectedCourseIndex(change as SelectOption | null);
            setSelectedSection(null);
            setSelectedTerm(null);
          }}
          options={courseTitles.map((item, i) => {
            return { value: i, label: item };
          })}
          styles={customStyles}
          //onFocus={() => setFocused(true)}
          //onBlur={() => setFocused(false)}

          //label="Select a class..."
          // Add aria-label for accessibility
          aria-label="Select a class"
          placeholder="Select a class..."
        />
      </Grid.Col>
      <Grid.Col xs={6} sm={6} md={3} lg={3}>
        <Select
          instanceId="section-select"
          components={{ Option: CustomOption, MenuList: MenuList }}
          //filterOption={createFilter({ ignoreAccents: false })}
          //ignoreAccents={false}
          filterOption={createFilter(filterConfig)}
          captureMenuScroll={false}
          isClearable={true}
          value={selectedSection}
          onChange={(change) => {
            const value = change as SelectOption | null;
            setSelectedSection(value);
            setSelectedTerm(null);
          }}
          options={sections.map((item, i) => {
            return { value: i, label: item.toString() };
          })}
          styles={customStyles}
          isDisabled={!selectedCourseIndex}
          //onFocus={() => setFocused(true)}
          //onBlur={() => setFocused(false)}

          //label="Select a section..."
          // Add aria-label for accessibility
          aria-label="Select a section"
          placeholder="Select a section..."
        />
      </Grid.Col>
      <Grid.Col xs={6} sm={6} md={3} lg={3}>
        <Select
          instanceId="term-select"
          components={{ Option: CustomOption, MenuList: MenuList }}
          //filterOption={createFilter({ ignoreAccents: false })}
          //ignoreAccents={false}
          filterOption={createFilter(filterConfig)}
          noOptionsMessage={() => "No options"}
          captureMenuScroll={false}
          isClearable={true}
          value={selectedTerm}
          onChange={(change) => setSelectedTerm(change as SelectOption | null)}
          options={terms}
          styles={customStyles}
          isDisabled={!selectedSection}
          //onFocus={() => setFocused(true)}
          //onBlur={() => setFocused(false)}

          //label="Select a term..."
          // Add aria-label for accessibility
          aria-label="Select a term"
          placeholder="Select a term..."
        />
      </Grid.Col>
      <Grid.Col xs={12} sm={12} md={3} lg={1}>
        <Button
          fullWidth
          disabled={buttonDisabled ? true : !selectedTerm ? true : false}
          onClick={() => {
            resetSectionTerm();

            if (
              router.query.grade &&
              Array.from((router.query.grade as string).matchAll(/\d+_/g))
                .map((item) => item[0].slice(0, -1))
                .includes(selectedTerm.value.toString())
            ) {
              return;
            }
            // console.log(
            //   "THIS OBJ::",
            //   selectedTerm,
            //   courseTitles[selectedTerm.value],
            //   selectedSection,
            //   selectedCourseIndex
            // );

            const newRoute = `${
              selectedTerm.value
            }_${selectedCourseIndex.label.replace(" ", "-")}-${
              selectedSection.label
            }-${selectedTerm.label.replace(" ", "-")}`;
            router
              .push(
                router.asPath === "/grades"
                  ? `/grades/${newRoute}`
                  : `${router.asPath}&${newRoute}`,
                undefined,
                {
                  shallow: true,
                }
              )
              .then(() => {
                // Promise resolved successfully
                //console.log("Route changed!");
              })
              .catch((error) => {
                // Promise rejected with an error
                console.log("Route change error:", error);
              });
          }}
        >
          Add Class
        </Button>
      </Grid.Col>
    </Grid>
  );
}
