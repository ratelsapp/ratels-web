import React, { useState, useEffect } from "react";
import "./_style.scss"

interface Props {
  rate: number
}

const Progress: React.FC<Props> = ({ rate }) => {
  return (
    <div className="progress">
      <div className='progress_title'>querying：{rate?.toFixed(2)}%</div>

      <div className="progress_rate">
        <div className='progress_rate--line' style={{width: `${rate}%`}}></div>
      </div>

      <div className='progress_tips'>Only part of the data is displayed here. You can click “Download” after the complete query to view all the data.</div>

    </div>
  );
};

export default Progress;
