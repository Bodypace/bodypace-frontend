"use client";

import Logo from "@/components/atoms/logo";
import Button from "@/components/atoms/button";
import Link from "@/components/atoms/link";
import Navigation from "@/components/molecules/navigation";
import Footer from "@/components/molecules/footer";
import Tile from "@/components/molecules/tile";

const content = {
  tiles: {
    first: {
      category: "Personalized & Private",
      title: "Don't miss anything important health-wise while living care-free",
      p1: "Interpret your data with the latest medical knowledge to get personalized and cost-aware recommendations, both proactive and reactive. Every result generated has available explanations of where it came from.",
      p2: "Our algorithms, which analyze your data, never expose it and can be run offline animously without any account.",
      p3: 'Our free and optional "Online account" supports data stored on local devices.',
    },
    second: {
      category: "Secure & Decentralized",
      title: "Even we don't have access to your data",
      p1: "When using Bodypace, your data is truly yours; there is no need to trust a company or a government. We don't have to make any claims that your data is safe, as it's impossible for us to read your data, analyze it, sell it, etc.",
      p2: "You can store your data in our cloud but don't have to",
      p3: 'There is no obligatory central database. We provide you with an optional "Online account" which offers optional storage, but you may as well keep all or some data on your devices.',
    },
    third: {
      category: "Open & Trustless",
      title:
        "Our source code, finances and development process are an open book",
      p1: "Everyone can audit and contribute to Bodypace. Everything is shared under simple and permissive licenses.",
      p2: 'Data on our servers ("Online account") is fully encrypted, but if you don\'t trust it, you can read the source-code, spin up your own Bodypace server instance, or keep your data somewhere else.',
      p3: "If you decide to use our cloud storage, that's is the only thing you pay for; features developed by Bodypace are actually free.",
    },
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <header className="flex flex-col items-center gap-md py-2xl">
        <Logo />
        <h1 className="font-light text-2xl text-color-primary">
          Own your health data, share it, and get insights from it
        </h1>
      </header>
      <div className="flex flex-row gap-md">
        <Button
          text="Login/Register"
          className="w-[280px]"
          border
          center
          target="account"
        />
        <Button
          text="Receive Share"
          className="w-[280px]"
          border
          center
          target="receive-share"
        />
        <Button
          text="Download App"
          className="w-[280px]"
          border
          center
          target="downloads"
        />
      </div>
      <div className="py-md">
        <Link
          target="about-us"
          text="Read more about our goals and upcomming new features"
        />
      </div>
      <div className="flex flex-row gap-lg py-2xl">
        {[content.tiles.first, content.tiles.second, content.tiles.third].map(
          (tile) => (
            <Tile
              key={tile.category}
              category={tile.category}
              title={tile.title}
              paragrap_1={tile.p1}
              paragrap_2={tile.p2}
              paragrap_3={tile.p3}
            />
          ),
        )}
      </div>
      <Footer />
    </main>
  );
}
