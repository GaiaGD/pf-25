import { content } from "../../content.json";

import Card from "@/app/components/Card/Card";

export default function Home() {
console.log(content);

  
  return (
    <div className="page">
      <main className="main">

        {
          content.map((item, index) => (
            <Card
              key={index}
              heading={item.heading}
              subheading={item.subheading}
            />
          ))
        }

      </main>
    </div>
  );
}
