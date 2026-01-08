export default function TotalBox({ total }) {
  return (
    <div className="alert alert-success text-end fw-bold fs-5">
      Total : {total.toFixed(2)} DH
    </div>
  );
}
