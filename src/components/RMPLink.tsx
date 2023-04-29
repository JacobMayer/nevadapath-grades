import { Button } from "@mantine/core";

const RMPLink = ({ name }: { name: string }) => {
  const baseURL =
    "https://www.ratemyprofessors.com/search/teachers?query=Vladimir+Pravosudov&sid=U2Nob29sLTQyODg%3D";

  const names = name.split(";");

  // const RMPLinks = names.map((name, index) => {
  //   const url = new URL(baseURL);
  //   const searchName = name.trim().replace(/\s\w+\.?/i, "");
  //   const [lastName, firstName] = searchName.split(",");
  //   url.searchParams.set("query", `${firstName} ${lastName}`);
  //   return (
  //       <Button
  //         key={index}
  //         component="a"
  //         target="_blank"
  //         href={url.toString()}
  //         style={{ padding: 2.5 }}
  //         compact
  //         variant="subtle"
  //       >
  //         {name}
  //       </Button>
  //   );
  // });

  // const url = new URL(baseURL);
  // const searchName = name.replace(/\s\w\.?/i, "");
  // const [lastName, firstName] = searchName.split(",");
  // url.searchParams.set("query", `${firstName} ${lastName}`);
  // console.log(url.toString());
  return (
    <>
      {names.map((name, index) => {
        const url = new URL(baseURL);
        const searchName = name.trim().replace(/\s\w+\.?/i, "");
        const [lastName = "", firstName = ""] = searchName.split(",");
        url.searchParams.set("query", `${firstName} ${lastName}`);
        return (
          <Button
            key={index}
            component="a"
            target="_blank"
            href={url.toString()}
            style={{ padding: 2.5 }}
            compact
            variant="subtle"
          >
            {name}
          </Button>
        );
      })}
    </>
  );
};

export default RMPLink;
