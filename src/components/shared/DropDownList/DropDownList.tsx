import React from 'react';
import { DropDownModel } from '../../main/Search/Search';
import './DropDownList.scss';

interface DropDownListProps {
  items: DropDownModel[];
  value: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropDownList = ({
  items,
  value,
  handleSelectChange
}: DropDownListProps): JSX.Element => {
  return (
    <div className="drop-down-list">
      {items.map((elem) => (
        <label key={elem.id} className="drop-down-list__label">
          {elem.title}
          <select
            className="drop-down-list__select"
            value={value}
            onChange={handleSelectChange}
          >
            {elem.list.map((item, index) => (
              <option key={item.id} disabled={index === 0} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
};
