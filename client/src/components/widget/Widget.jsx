import Card from "components/card";

const Widget = ({ icon, title, subtitle, cardhref }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] ">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="bg-lightPrimary rounded-full bg-gray-100 p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <a href={cardhref}>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {subtitle}
          </h4>
        </div>
      </a>
    </Card>
  );
};

export default Widget;
