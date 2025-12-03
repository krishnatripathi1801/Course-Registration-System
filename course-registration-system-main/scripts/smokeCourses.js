(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/courses');
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Length:', text.length);
    console.log(text.substring(0, 200));
  } catch (e) {
    console.error('Smoke courses failed:', e);
    process.exit(1);
  }
})();
