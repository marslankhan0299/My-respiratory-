import fs from 'fs';

let content = fs.readFileSync('src/components/GuestbookBoard.tsx', 'utf8');
content = content.replace(/saqib-guestbook-notes/g, "arslan-guestbook-notes");
content = content.replace(/saqib-guestbook-votes/g, "arslan-guestbook-votes");
content = content.replace(/Saqib's custom/g, "Arslan's custom");
content = content.replace(/inspiring Saqib/g, "inspiring Arslan");
content = content.replace(/Hire Saqib/g, "Hire Arslan");
content = content.replace(/Saqib's collaborative/g, "Arslan's collaborative");
content = content.replace(/Saqib Fan/g, "Arslan Fan");
fs.writeFileSync('src/components/GuestbookBoard.tsx', content);
console.log('GuestbookBoard updated');
