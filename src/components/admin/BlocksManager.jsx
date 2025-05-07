import React, { useEffect, useState } from 'react';
import { getAdminBlocks, deleteContentBlock } from '../../api';
import BlockForm from './BlockForm';

function BlocksManager() {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBlockId, setEditingBlockId] = useState(null);

    const fetchBlocks = async () => {
        try {
            setLoading(true);
            const data = await getAdminBlocks(); // Uses public endpoint for listing
            setBlocks(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load content blocks for admin.');
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBlocks();
    }, []);

    const handleDeleteBlock = async (blockId) => {
        if (window.confirm('Are you sure you want to delete this content block?')) {
            try {
                await deleteContentBlock(blockId);
                fetchBlocks(); // Refresh the list
            } catch (err) {
                alert('Failed to delete content block.');
                console.error(err);
            }
        }
    };

    const handleFormSuccess = () => {
        setShowAddForm(false);
        setEditingBlockId(null);
        fetchBlocks(); // Refresh the list of blocks
    };

    return (
        <div className="mb-4 p-4 border rounded bg-light">
            <h3 className="mb-3 border-bottom pb-2">Manage Content Blocks</h3>

            {!showAddForm && !editingBlockId && (
                 <button onClick={() => setShowAddForm(true)} className="btn btn-primary mb-3">
                    Add New Block
                </button>
            )}

            {showAddForm && <BlockForm onSuccess={handleFormSuccess} onCancel={() => setShowAddForm(false)} />}
            {editingBlockId && <BlockForm blockId={editingBlockId} onSuccess={handleFormSuccess} onCancel={() => setEditingBlockId(null)} />}

            {loading && <p>Loading blocks...</p>}
            {error && <div className="text-danger">{error}</div>}

            {!showAddForm && !editingBlockId && (
                 <div className="row g-3">
                    {blocks.map((block) => (
                        <div key={block._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100">
                                <img src={block.imageUrl} className="card-img-top" alt="Block Preview" style={{ height: '120px', objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-truncate">{block.text.substring(0, 50)}...</h5>
                                    <p className="card-text text-muted text-sm mb-1">Size: {block.size}</p>
                                     {/* Display Link URL in admin view */}
                                    {block.linkUrl && (
                                         <p className="card-text text-muted text-sm mb-3 text-truncate">Link: {block.linkUrl}</p>
                                    )}

                                    <div className="mt-auto">
                                        <button onClick={() => setEditingBlockId(block._id)} className="btn btn-sm btn-secondary me-2">Edit</button>
                                        <button onClick={() => handleDeleteBlock(block._id)} className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            )}

             {blocks.length === 0 && !loading && !error && !showAddForm && !editingBlockId && <p className="text-muted mt-3">No content blocks added yet.</p>}
        </div>
    );
}

export default BlocksManager;