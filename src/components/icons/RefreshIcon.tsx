'use client';

import React from 'react';

interface RefreshIconProps {
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({
  className = '',
  stroke = 'currentColor',
  strokeOpacity = 1,
}) => {
  return (
    <div
      className={className}
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: stroke,
        mask: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACz0lEQVR4AexV0VHbQBDdE/DBDAirgtgVJFQQu4JABTEVBFdgu4KECuIOoAPTAaSCOBXIkj3DDB7p8t5Kp5FsR4ODCPng5la3t3f73u3d3smTVypvxP9s4/+/rV4swm4cR9+jaP4zjud2F4HPXQxfYvxpCzcifngI23E8n1prpiK2b4y0ZccCnw/0JQawrom5DlEh5oTVioTSFRRrZS4iN9ba8S5CH4irZ8QktjOwLYg5wAkwaoQgukpT2/H91vnJSTDaReiTJLZDDOCxtokdhmGLHUpBvFp5Qxgc6RhEl0EQMGKYd6/wnRED5OPcu723533NdVFiRis4z8xoJnAYZfrzvznWTYZk+y5qJX58lDPJS5KkboW55fmNMfbKoXie9AVFiY0xH6ELkmnGLaLepBwfB7fAm0HEGO89WyWGoodujOigvEzJsa3mkSPWJELEuoCX4a2iKjEy7xfNiLjtDp/9hiV/G+wP4ioxDjzPOmlB18Pn4N/Ichl9wWs1zW5KhhDHYYGJ4Hje2XXi4WOb9QyMMcOyU+b6tO9iEQ3x6HzD7C5uipJlWGYImyav7wcapEZMI1J+wBbS4iuTOaD3xEpSHJnefwaRpjIhBrEAoQkFjuKqFsRcCRzdAJ84/cMslyEefLjW1HVSEAz2973PIL2Dm5ISGxwT9LUWxOzxleEE6hBkuO2nqcECqr/FKAovMa61TEqDMQIicw2ckYgAQwQ6n2D2xZUKMY0kTxJ7Cl2TAO1GNcZ8ckaA1u3ILaLvEdPNd+0GMQfwet37fquHBXSw3nOAV36LsF9wHgX6gGdKPRckqb04ONA/W4+Jm9srzVZiNwMLmPnIQq64LLSX5yCTeyXyNp7Fd4eHARbgZm22tcSb07dbuJAyOXZoVL6727waISbwOjltddIYMUkcuefZUxxRcXU4ti6NEhOc5EdHwT31OmmcuI6sPPZqxL8BAAD//ziBZvcAAAAGSURBVAMAJiTRTOs2jFUAAAAASUVORK5CYII=') no-repeat center`,
        maskSize: 'contain',
        opacity: strokeOpacity,
      }}
    />
  );
};

export default RefreshIcon;
