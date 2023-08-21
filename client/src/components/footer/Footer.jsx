const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
          ©{1900 + new Date().getYear()}{" "}
          <a
            href="https://starkenn.com/"
            className="hover:underline"
            target="blank"
          >
            Starkenn Technologies
          </a>
          &nbsp;&nbsp;
          <div className="heartbeat">
            <span>❤️</span>
          </div>
          &nbsp;All Rights Reserved.
        </p>
      </h5>
      <div>
        <ul className="footer-content flex flex-wrap items-center gap-3 sm:flex-wrap md:gap-10">
          <li>
            <a
              target="blank"
              href="mailto:hello@simmmple.com"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Support
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://starkenn.com/"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Terms & Conditions
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://starkenn.com/"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
