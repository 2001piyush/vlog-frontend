import React from 'react';
import ContentBlock from './ContentBlock'; // Adjust the path
import './ContentGrid.css'; // Optional: Add your own styles
function ContentGrid({ contentBlocksData }) { // Assume contentBlocksData is an array of block objects

    // Function to determine grid classes based on block.size
    const getGridClasses = (size) => {
        switch (size) {
            case 'small':
                // Example: 2 blocks per row on medium, 3 on large, 4 on extra large
                return 'col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3';
            case 'medium':
                // Example: 1 block per row on small, 2 on medium, 2 on large
                return 'col-12 col-sm-12 col-md-6 col-lg-6';
            case 'large':
                // Example: Always full width or larger fraction
                return 'col-12 col-md-12 col-lg-8'; // Example: full width small/medium, 2/3 width large+
            default:
                // Default size if block.size is not recognized
                return 'col-12 col-sm-6 col-md-4 col-lg-3';
        }
    };

    return (
        // Use Bootstrap's row class to contain the columns
        <div className="container-fluid px-4  "> {/* Optional: Centers content and adds vertical margin */}
            <div className="row">
                {contentBlocksData.map(block => (
                    <ContentBlock 
                        key={block.id} // Unique key for each item in the list
                        block={block}
                        // Call the function to get the right grid classes
                        gridClasses={getGridClasses(block.size)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ContentGrid;