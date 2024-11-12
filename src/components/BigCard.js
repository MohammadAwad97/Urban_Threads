function BigCard({ src }) {
  return (
    <div className="flex justify-center items-center h-[90vh] w-full gap-3">
      <div className="imgContainer h-full w-[90vw]">
        <img className="h-full" src={src} alt="##" />
      </div>
      <div className="">
        <h2 className="text-3xl w-80 font-semibold">
          BIG Savings Are Happening!
        </h2>
        <p>
          - For every regular price design purchased, get one FREE with code:
          SUNSHINE. <hr />- Valid through Monday, April 1 at noon, Central time.
          - Code can be used on two orders.
        </p>
      </div>
    </div>
  );
}
export default BigCard;
