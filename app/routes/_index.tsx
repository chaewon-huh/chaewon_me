import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import { getAllPosts } from "~/lib/markdown.server";

export async function loader(_: LoaderFunctionArgs) {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);
  return json({ recentPosts });
}

export default function Index() {
  const { recentPosts } = useLoaderData<typeof loader>();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Chaewon Huh</h1>

      <p className="text-[15px] leading-[1.8] mb-8">
        20yo dreamer. Looking for smart, driven young talents
      </p>

      <p className="text-[15px]">
        <a
          href="mailto:chase@dooilabs.com"
          className="underline hover:no-underline"
        >
          chase@dooilabs.com
        </a>
      </p>

      <div style={{ marginTop: "48px" }}>
        <div style={{ marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
              marginTop: "32px",
            }}
          >
            Thoughts
          </h2>
          <div className="space-y-2">
            {recentPosts.map((post) => (
              <div key={post.slug} className="text-[15px]">
                •{" "}
                <Link
                  to={`/blog/${post.slug}`}
                  className="underline hover:no-underline"
                >
                  {post.title}
                </Link>
                <span className="text-gray-500 ml-2">— {post.date}</span>
              </div>
            ))}
            <div className="text-[15px]" style={{ marginTop: "16px" }}>
              •{" "}
              <Link to="/blog" className="underline hover:no-underline">
                View all →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
              marginTop: "32px",
            }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            <div>
              <button
                onClick={() => toggleExpand("hir")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("hir")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • HIR (Hacker in Residence) at Bass Ventures (25.09 - Present)
                </span>
              </button>
              {expandedItems.includes("hir") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5">
                    <li>Building in Residence, Collecting Context</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("ondemand")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("ondemand")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • AI Engineer at Ondemand Soft (25.07 - 25.09)
                </span>
              </button>
              {expandedItems.includes("ondemand") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5">
                    <li>
                      Trained and deployed AI models to improve fetal 3D
                      ultrasound images without malformations.
                    </li>
                  </ul>
                  <div style={{ marginTop: "16px" }}>
                    <img
                      src="/images/ods.gif"
                      alt="Fetal 3D ultrasound enhancement"
                      width={400}
                      height={400}
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("stealth")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("stealth")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • Stealth Startup (25.04 - 25.08)
                </span>
              </button>
              {expandedItems.includes("stealth") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Grinding away on various projects.</li>
                    <li style={{ marginTop: "8px" }}>
                      Aug: B2C Viral Product - 10M+ Reels views in Korea, modest
                      monetization despite viral traction
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("dalpha")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("dalpha")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • AI Engineer at Dalpha (24.07 - 25.02)
                </span>
              </button>
              {expandedItems.includes("dalpha") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>
                      Worked at a Korean Palantir-like(customized B2B solutions)
                      startup that raised over 10m USD
                    </li>
                    <li>
                      Built and deployed end-to-end AI pipelines for more than
                      10 enterprise clients.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
              marginTop: "32px",
            }}
          >
            Education
          </h2>
          <div className="space-y-4">
            <div className="text-[15px] leading-[1.8]">
              • BS, POSTECH (24.03 - Present)
              <div style={{ marginLeft: "40px", marginTop: "12px" }}>
                <ul className="list-disc list-outside ml-5">
                  <li>on leave after semester 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
              marginTop: "32px",
            }}
          >
            Awards
          </h2>
          <div className="space-y-4">
            <div>
              <button
                onClick={() => toggleExpand("presidential")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("presidential")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • POSTECH Presidential Fellowship &apos;24
                </span>
              </button>
              {expandedItems.includes("presidential") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Awarded a 45k usd scholarship.</li>
                    <li>First recipient from a general high school.</li>
                    <li>One of only two selected in the class of &apos;28.</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("isef2023")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("isef2023")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • Grand Award 4th Place at Regeneron ISEF &apos;23
                </span>
              </button>
              {expandedItems.includes("isef2023") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>
                      world&apos;s largest pre-college science competition,
                      where high school students showcase innovative research
                      projects in STEM fields, organized annually by the Society
                      for Science.
                    </li>
                    <li>
                      Project:{" "}
                      <a
                        href="https://isef.net/project/ebed023t-autonomous-walking-aid-for-the-blind"
                        className="underline hover:no-underline"
                      >
                        Autonomous Walking Aid for the Blind
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("isef-finalist")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("isef-finalist")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • Finalist at Regeneron ISEF &apos;22 & &apos;23
                </span>
              </button>
              {expandedItems.includes("isef-finalist") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>
                      world&apos;s largest pre-college science competition,
                      where high school students showcase innovative research
                      projects in STEM fields, organized annually by the Society
                      for Science.
                    </li>
                    <li>
                      &apos;23 Project:{" "}
                      <a
                        href="https://isef.net/project/ebed023t-autonomous-walking-aid-for-the-blind"
                        className="underline hover:no-underline"
                      >
                        Autonomous Walking Aid for the Blind
                      </a>
                      .
                    </li>
                    <li>
                      &apos;22 Project:{" "}
                      <a
                        href="https://abstracts.societyforscience.org/Home/FullAbstract?ISEFYears=2022,&Category=Any%20Category&Finalist=Huh&AllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&ProjectId=21742"
                        className="underline hover:no-underline"
                      >
                        Link
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("codefair22")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("codefair22")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • First Place at Korea Code Fair &apos;22
                </span>
              </button>
              {expandedItems.includes("codefair22") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <p>
                    major coding competition and fair, which evolved from the
                    KOI competition division and serves as an ISEF qualifier.
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("codefair21")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("codefair21")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • Second Place at Korea Code Fair &apos;21
                </span>
              </button>
              {expandedItems.includes("codefair21") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <p>
                    major coding competition and fair, which evolved from the
                    KOI competition division and serves as an ISEF qualifier.
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleExpand("talent")}
                className="text-left w-full text-[15px] leading-[1.8] hover:opacity-70 transition-opacity"
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span
                  className={
                    expandedItems.includes("talent")
                      ? "font-semibold underline"
                      : ""
                  }
                >
                  • Talent Award of Korea &apos;22
                </span>
              </button>
              {expandedItems.includes("talent") && (
                <div
                  style={{ marginLeft: "40px", marginTop: "12px" }}
                  className="text-[15px] leading-[1.8]"
                >
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>
                      National accolade presented by the South Korean government
                      to recognize and nurture exceptional young talents in
                      fields such as science, technology, arts, and humanities,
                      fostering innovation and leadership.
                    </li>
                    <li>Same award as received by Yuna Kim.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
