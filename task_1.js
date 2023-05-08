const xmlString = `
    <list>
      <student>
        <name lang="en">
          <first>Ivan</first>
          <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
      </student>
      <student>
        <name lang="ru">
          <first>Петр</first>
          <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
      </student>
    </list>
`;

const xmlParser = new DOMParser();

const xmlTask = xmlParser.parseFromString(xmlString, 'text/xml');
const listNode = xmlTask.querySelector('list');

const studentNode = listNode.querySelectorAll('student');
const studentsArr = [];
studentNode.forEach(student => {studentsArr.push({
    name: student.querySelector('name').querySelector('first').textContent + ' ' + student.querySelector('name').querySelector('second').textContent,
    age: student.querySelector('age').textContent,
    prof: student.querySelector('prof').textContent,
    lang: student.querySelector('name').getAttribute('lang')
})});
const result = {
    list: studentsArr
}
console.log(result)