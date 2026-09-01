import type {
  ReactNode,
} from "react";

import Link from "next/link";

import {
  Feather,
  Sparkles,
  BookOpen,
} from "lucide-react";


interface AuthLayoutProps {
  children: ReactNode;

  title: string;

  subtitle: string;
}


export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <main
      className="
        min-h-screen
        bg-[#09090b]
        text-white
        grid
        lg:grid-cols-2
      "
    >

      {/* LEFT SIDE */}

      <section
        className="
          relative
          hidden
          lg:flex
          overflow-hidden
          border-r
          border-white/10
          p-12
          xl:p-16
        "
      >

        {/* Background effects */}

        <div
          className="
            absolute
            top-[-200px]
            left-[-150px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-violet-600/30
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            right-[-100px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-fuchsia-500/20
            blur-[140px]
          "
        />


        <div
          className="
            relative
            z-10
            flex
            flex-col
            justify-between
            w-full
          "
        >

          {/* Logo */}

          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
              w-fit
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500
                to-fuchsia-600
                shadow-lg
                shadow-violet-500/20
              "
            >
              <Feather
                size={22}
              />
            </div>

            <span
              className="
                text-xl
                font-semibold
                tracking-tight
              "
            >
              GolpoKotha
            </span>

          </Link>


          {/* Main content */}

          <div
            className="
              max-w-xl
            "
          >

            <div
              className="
                mb-8
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                text-zinc-300
                backdrop-blur-xl
              "
            >

              <Sparkles
                size={16}
                className="
                  text-violet-400
                "
              />

              <span>
                Write. Share. Inspire.
              </span>

            </div>


            <h1
              className="
                text-5xl
                xl:text-6xl
                font-bold
                leading-[1.05]
                tracking-tight
              "
            >
              Your ideas deserve
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-violet-400
                  via-fuchsia-400
                  to-pink-400
                  bg-clip-text
                  text-transparent
                "
              >
                to be discovered.
              </span>
            </h1>


            <p
              className="
                mt-7
                max-w-lg
                text-lg
                leading-relaxed
                text-zinc-400
              "
            >
              Join a community of writers,
              creators and curious minds.
              Share your stories and discover
              ideas that matter.
            </p>


            {/* Feature cards */}

            <div
              className="
                mt-12
                grid
                grid-cols-2
                gap-4
              "
            >

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  backdrop-blur-xl
                "
              >

                <BookOpen
                  size={22}
                  className="
                    mb-3
                    text-violet-400
                  "
                />

                <h3
                  className="
                    font-medium
                  "
                >
                  Discover stories
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-zinc-500
                  "
                >
                  Explore ideas from creators
                  around the world.
                </p>

              </div>


              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  backdrop-blur-xl
                "
              >

                <Sparkles
                  size={22}
                  className="
                    mb-3
                    text-fuchsia-400
                  "
                />

                <h3
                  className="
                    font-medium
                  "
                >
                  Build your audience
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-zinc-500
                  "
                >
                  Publish your thoughts and
                  connect with users.
                </p>

              </div>

            </div>

          </div>


          {/* Footer */}

          <p
            className="
              text-sm
              text-zinc-600
            "
          >
            © 2026 GolpoKotha. Built for ideas.
          </p>

        </div>

      </section>



      {/* RIGHT SIDE */}

      <section
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          px-5
          py-10
          pt-20
          sm:px-8
          sm:pt-10
        "
      >

        {/* Mobile logo */}

        <Link
          href="/"
          className="
            absolute
            top-6
            left-6
            flex
            items-center
            gap-2
            lg:hidden
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-violet-500
              to-fuchsia-600
            "
          >
            <Feather
              size={20}
            />
          </div>

          <span
            className="
              font-semibold
            "
          >
            GolpoKotha
          </span>

        </Link>


        <div
          className="
            w-full
            max-w-md
          "
        >

          {/* Heading */}

          <div
            className="
              mb-10
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                sm:text-4xl
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-3
                text-zinc-400
              "
            >
              {subtitle}
            </p>

          </div>


          {children}

        </div>

      </section>

    </main>
  );
}