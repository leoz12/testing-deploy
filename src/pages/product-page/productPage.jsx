import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    no,
    productName,
    productCategory,
    productFreshness,
    additionalDescription,
    productPrice,
  } = location.state || {};
  const data = [
    {
      label: "No",
      value: no,
    },
    {
      label: "Product Name",
      value: productName,
    },
    {
      label: "Product Category",
      value: productCategory,
    },
    {
      label: "Product Freshness",
      value: productFreshness,
    },
    {
      label: "Additional Description",
      value: additionalDescription,
    },
    {
      label: "Product Price",
      value: productPrice,
    },
  ];
  return (
    <div>
      <Card
        title={location.pathname}
        style={{ width: 300, margin: "auto", marginTop: 50 }}
      >
        {data.map((item, idx) => (
          <div key={idx} style={{ paddingBottom: 10 }}>
            <strong>{item.label}</strong>
            <p>{item.value || "-"}</p>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Card>
    </div>
  );
}
