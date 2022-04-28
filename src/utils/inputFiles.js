const InputField = ({ title, campaignData, setCampaignData, errors }) => {
  return (
    <>
      <div className="single_field">
        <label htmlFor="campaign_title" className="required">
          {title}
        </label>
        <input
          type="text"
          name="campaign_title"
          id="campaign_title"
          value={campaignData.name}
          onChange={(e) =>
            setCampaignData({ ...campaignData, name: e.target.value })
          }
        />
      </div>
      <div
        className="error_field"
        style={
          Object.keys(errors).length === 0
            ? { display: "none" }
            : { display: "grid" }
        }
      >
        <div />
        <p className="form_error">{errors.name}</p>
      </div>
    </>
  );
};
