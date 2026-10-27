'use strict';
const lessons = {
 english: {title:'English: Naming words',body:'<p>A <strong>noun</strong> names a person, place, animal or thing. For example: teacher, school, cat and book are all nouns.</p>',question:'Which word names an animal?',answers:['Happy','Cat','Run'],correct:1,explanation:'Cat is a noun because it names an animal.'},
 urdu: {title:'Urdu: Meet the letters',body:'<p lang="ur" dir="rtl">آج ہم تین حروف سیکھیں گے: <strong>ا، ب، پ</strong>۔<br>ا سے انار، ب سے بکری، پ سے پتنگ۔</p><p>Meet Alif (ا), Bay (ب) and Pay (پ). Alif begins انار (pomegranate).</p>',question:'Which letter begins انار (pomegranate)?',answers:['ب','ا','پ'],correct:1,explanation:'ا (Alif) is the first letter of انار.'},
 maths: {title:'Maths: Add a little',body:'<p>Addition means putting groups together. If you have <strong>2 pencils</strong> and get <strong>3 more</strong>, you have <strong>5 pencils</strong> altogether. We write this as 2 + 3 = 5.</p>',question:'You have 3 apples and get 4 more. How many now?',answers:['6','7','8'],correct:1,explanation:'3 + 4 = 7. Count on from 3: 4, 5, 6, 7.'},
 islamiat: {title:'Islamiat: Everyday kindness',body:'<p>Islam teaches kindness, honesty and care for others. We can practise good manners by speaking gently, telling the truth, helping people and treating animals with care.</p>',question:'Which action shows kindness?',answers:['Helping someone who has fallen','Laughing at someone’s mistake','Taking someone’s things'],correct:0,explanation:'Helping someone who has fallen shows care and kindness.'}
};
const dialog=document.querySelector('#lesson');
const form=document.querySelector('#quiz');
let currentLesson=null;
let opener=null;
const menu=document.querySelector('#menu');
const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
document.querySelectorAll('[data-subject]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;currentLesson=lessons[button.dataset.subject];
 document.querySelector('#lesson-title').textContent=currentLesson.title;
 document.querySelector('#content').innerHTML=currentLesson.body;
 document.querySelector('#question').textContent=currentLesson.question;
 const answers=document.querySelector('#answers');answers.replaceChildren();
 currentLesson.answers.forEach((answer,index)=>{const label=document.createElement('label');const radio=document.createElement('input');radio.type='radio';radio.name='answer';radio.value=String(index);radio.required=true;if(button.dataset.subject==='urdu'){label.lang='ur';}label.append(radio,document.createTextNode(answer));answers.append(label);});
 document.querySelector('#feedback').textContent='';dialog.showModal();
}));
form.addEventListener('submit',event=>{event.preventDefault();const selected=form.querySelector('input:checked');if(!selected||!currentLesson)return;const correct=Number(selected.value)===currentLesson.correct;document.querySelector('#feedback').textContent=correct?'✓ Well done! '+currentLesson.explanation:'Not quite yet. Try again — you can do this!';});
document.querySelector('#close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(opener)opener.focus();});
