import React, { useEffect, useState } from 'react';
import { addContentBlock, getAdminBlockById, updateContentBlock } from '../../api';

// Reusable form for adding and editing blocks
function BlockForm({ blockId, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        imageUrl: '',
        text: '',
        size: 'medium',
        linkUrl: '', // Add linkUrl to initial state
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditing = !!blockId;

    // Fetch block data if editing
    useEffect(() => {
        const fetchBlock = async () => {
            if (isEditing) {
                setLoading(true);
                try {
                    const block = await getAdminBlockById(blockId);
                    setFormData({
                        imageUrl: block.imageUrl,
                        text: block.text,
                        size: block.size,
                        linkUrl: block.linkUrl || '', // Set from fetched data, default to empty string
                    });
                    setLoading(false);
                } catch (err) {
                    setError('Failed to load block for editing.');
                    setLoading(false);
                    console.error(err);
                }
            }
        };

        fetchBlock();
    }, [blockId, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation (linkUrl is optional, but check if provided)
        if (!formData.imageUrl || !formData.text || !formData.size) {
            setError('Image URL, text, and size are required.');
            return;
        }

         // Optional: Validate linkUrl format if provided
         if (formData.linkUrl && !URL.parse(formData.linkUrl)) {
             // You might need a more robust URL validation regex
             // This basic check might not catch all invalid URLs
             console.warn("Basic URL validation failed for:", formData.linkUrl);
             // Depending on how strict you want to be, you might set an error here
             // setError('Invalid link URL format.');
             // return;
         }


        setLoading(true);
        try {
            const blockDataToSave = { // Create object with only fields we want to send
                 imageUrl: formData.imageUrl,
                 text: formData.text,
                 size: formData.size,
                 linkUrl: formData.linkUrl, // Include linkUrl
            };

            if (isEditing) {
                await updateContentBlock(blockId, blockDataToSave);
                 alert('Block updated successfully!');
            } else {
                await addContentBlock(blockDataToSave);
                 alert('Block added successfully!');
                 setFormData({ // Clear form after adding
                    imageUrl: '',
                    text: '',
                    size: 'medium',
                    linkUrl: '',
                });
            }
            setLoading(false);
            onSuccess();
        } catch (err) {
            setError(`Failed to ${isEditing ? 'update' : 'add'} block.`);
            setLoading(false);
            console.error(err);
        }
    };

     if (loading && isEditing) return <p>Loading block data...</p>;


    return (
        <div className="mb-4 p-4 border rounded bg-white shadow">
            <h4 className="mb-3 border-bottom pb-2">{isEditing ? 'Edit Content Block' : 'Add New Content Block'}</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Text:</label>
                    <textarea id="text" name="text" value={formData.text} onChange={handleChange} required rows="4" className="form-control"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="size" className="form-label">Size:</label>
                    <select id="size" name="size" value={formData.size} onChange={handleChange} required className="form-select">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                 {/* New input for Link URL */}
                <div className="mb-3">
                    <label htmlFor="linkUrl" className="form-label">Link URL (Optional):</label>
                    <input type="text" id="linkUrl" name="linkUrl" value={formData.linkUrl} onChange={handleChange} className="form-control" placeholder="e.g., https://example.com/article" />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" disabled={loading} className="btn btn-success">
                        {loading ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Update Block' : 'Add Block')}
                    </button>
                     <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// Basic URL validation helper
function URLparse(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}


export default BlockForm;