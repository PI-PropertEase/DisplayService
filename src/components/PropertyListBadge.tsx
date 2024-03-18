interface IPropertyListBadgeProps {
  text: string;
}

const PropertyListBadge: React.FC<IPropertyListBadgeProps> = (
  props: IPropertyListBadgeProps
) => {
  const textToColor: Record<string, { light: string; dark: string }> = {
    occupied: { light: "bg-[#FF0000]", dark: "dark:bg-[#A72A2C]" },
    free: { light: "bg-[#77FF77]", dark: "dark:bg-[#11620B]" },
    "check-in soon": { light: "bg-[#FF6347]", dark: "dark:bg-orange-800" },
    "check-out soon": { light: "bg-[#0099E1]", dark: "dark:bg-[#4169E1]" },
  };

  return (
    <div>
      <span
        className={`badge text-xs md:h-[2rem] sm:h-[3rem] h-[3rem] text-center content-center ${
          textToColor[props.text.toLowerCase()].light
        } ${textToColor[props.text.toLowerCase()].dark}`}
      >
        {props.text}
      </span>
    </div>
  );
};

export default PropertyListBadge;
