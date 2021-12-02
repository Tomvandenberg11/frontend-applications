const Checkbox = ({ label, value, onChange }) => {
  return (
    <label style={{ marginBottom: 20, marginTop: 50 }}>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  )
}

export default Checkbox
