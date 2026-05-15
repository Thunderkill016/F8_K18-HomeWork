import Spreadsheet from "./components/Spreadsheet.jsx";

const App = () => {
  return (
    <main className="app-shell">
      <section className="workspace">
        <div className="page-heading">
          <p className="eyebrow">Bài tập 47</p>
          <h1>Mini Google Sheet</h1>
          <p>
            Click chọn ô, double click để sửa, hoặc chọn ô rồi gõ phím bất kỳ
            để chuyển ô đó thành input. Nhấn Enter để lưu và chuyển sang ô bên
            phải.
          </p>
        </div>

        <Spreadsheet />
      </section>
    </main>
  );
};

export default App;
