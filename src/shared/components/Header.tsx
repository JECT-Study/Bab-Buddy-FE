import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const logoFont = localFont({
  src: "../../app/fonts/TJJoyofsingingB_TTF.ttf",
  display: "swap",
});

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/assets/logo.svg" alt="로고" width={43} height={43} />
        <p className={logoFont.className}>밥버디</p>
      </div>
      <Link href={""}>마이페이지</Link>
    </header>
  );
}
