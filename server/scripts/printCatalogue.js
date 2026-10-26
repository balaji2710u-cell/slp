import fs from "fs";

const data = JSON.parse(fs.readFileSync("deep_audit_results.json"));

let out = "";
data.forEach((c, i) => {
  out += `[${i + 1}] ID: ${c.id}\n`;
  out += `    Title: "${c.title}"\n`;
  out += `    Slug: "${c.slug}"\n`;
  out += `    Group: "${c.learningGroup}"\n`;
  out += `    Category: "${c.category}"\n`;
  out += `    Level: "${c.level}"\n`;
  out += `    Desc: "${c.description}"\n`;
  out += `    Lessons (${c.lessons.length}):\n`;
  c.lessons.forEach((l, li) => {
    out += `      L${li + 1}: "${l.title}" | video: ${l.videoUrl}\n`;
  });
  out += "--------------------------------------------------------------------------------\n";
});

fs.writeFileSync("catalogue_inspection.txt", out, "utf8");
console.log("Wrote catalogue_inspection.txt as UTF-8");

