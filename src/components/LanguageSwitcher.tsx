"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "./ui/Button";
import { Languages } from "@/constants/enums";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="flex mx-4">
      {locale === Languages.ARABIC ? (
        <Button
          className="border border-white px-5 hover:bg-white hover:text-indigo-500"
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          className="border border-white px-5 hover:bg-white hover:text-indigo-500"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
