import classNames from "classnames";

// عملنا هون ديستراكشرينغ للبروبس كامل, و الباقي حطيناه في الريست .. >>  { children, primary, success, danger, rounded, ...rest } = props
function Button({ children, primary, success, danger, rounded, ...rest }) {
  console.log(rest);
  const className = classNames(
    "py-2 px-6",
    {
      rounded: rounded,
      "bg-[#9c73c1] text-white": primary,
      "bg-[#59b259] text-white": success,
      "bg-[#f60002] text-white": danger,
    },
    rest.className
  );

  return (
    <div>
      {/* هون بتلاحظ انو عملنا سبريد , النقاط الي فوق للدكج و لكن هاي للتفريغ , انتبه , بتفرق */}
      <button {...rest} className={className}>
        {children}
      </button>
    </div>
  );
}

export default Button;
