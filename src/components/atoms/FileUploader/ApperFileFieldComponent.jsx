import React, { useState, useEffect, useRef, useMemo } from 'react';
import ApperIcon from '@/components/ApperIcon';

const ApperFileFieldComponent = ({ config, elementId }) => {
  // State for UI-driven values
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  // Refs for tracking lifecycle and preventing memory leaks
  const mountedRef = useRef(false);
  const elementIdRef = useRef(elementId);
  const existingFilesRef = useRef([]);

  // Helper function to check if file is an image
  const isImageFile = (fileName) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'];
    const extension = fileName?.toLowerCase().split('.').pop();
    return imageExtensions.includes(extension);
  };
  // Update elementIdRef when elementId changes
  useEffect(() => {
    elementIdRef.current = elementId;
  }, [elementId]);

  // Memoize existingFiles to prevent re-renders & detect actual changes
  const memoizedExistingFiles = useMemo(() => {
    if (!config.existingFiles || !Array.isArray(config.existingFiles)) {
      return [];
    }
    
    // Return empty array if no files exist
    if (config.existingFiles.length === 0) {
      return [];
    }
    
    // Detect changes by checking length and first file's ID/id
    const currentFiles = existingFilesRef.current;
    if (currentFiles.length !== config.existingFiles.length) {
      return config.existingFiles;
    }
    
    // Check if first file has changed (indicates different files)
    if (config.existingFiles.length > 0 && currentFiles.length > 0) {
      const currentFirstId = currentFiles[0]?.Id || currentFiles[0]?.id;
      const newFirstId = config.existingFiles[0]?.Id || config.existingFiles[0]?.id;
      if (currentFirstId !== newFirstId) {
        return config.existingFiles;
      }
    }
    
    return currentFiles;
  }, [config.existingFiles]);

  // Initial Mount Effect
  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 50;
    const attemptDelay = 100; // 100ms per attempt = 5 seconds total

    const initializeSDK = async () => {
      try {
        // Wait for ApperSDK to load with timeout
        while (!window.ApperSDK && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, attemptDelay));
          attempts++;
        }

        if (!window.ApperSDK) {
          throw new Error('ApperSDK not loaded. Please ensure the SDK script is included before this component.');
        }

        if (!mounted) return;

        const { ApperFileUploader } = window.ApperSDK;
        elementIdRef.current = `file-uploader-${elementId}`;

        // Mount the file field with the full config
        await ApperFileUploader.FileField.mount(elementIdRef.current, {
          ...config,
          existingFiles: memoizedExistingFiles
        });

        if (mounted) {
          mountedRef.current = true;
          existingFilesRef.current = memoizedExistingFiles;
          setIsReady(true);
          setError(null);
        }
      } catch (error) {
        console.error('Error mounting file field:', error);
        if (mounted) {
          setError(error.message);
          setIsReady(false);
        }
      }
    };

    initializeSDK();

    // Cleanup on component destruction
    return () => {
      mounted = false;
      if (mountedRef.current && window.ApperSDK) {
        try {
          const { ApperFileUploader } = window.ApperSDK;
          ApperFileUploader.FileField.unmount(elementIdRef.current);
        } catch (error) {
          console.error('Error unmounting file field:', error);
        }
        mountedRef.current = false;
        existingFilesRef.current = [];
      }
    };
  }, [elementId, config.fieldKey, JSON.stringify(memoizedExistingFiles)]);

  // File Update Effect
  useEffect(() => {
    if (!isReady || !window.ApperSDK || !config.fieldKey) return;

    const updateFiles = async () => {
      try {
        // Deep equality check using JSON.stringify
        const currentFilesStr = JSON.stringify(existingFilesRef.current);
        const newFilesStr = JSON.stringify(memoizedExistingFiles);
        
        if (currentFilesStr === newFilesStr) return;

        const { ApperFileUploader } = window.ApperSDK;
        
        // Format detection: check for .Id vs .id property
        let filesToUpdate = memoizedExistingFiles;
        if (memoizedExistingFiles.length > 0) {
          const firstFile = memoizedExistingFiles[0];
          // If API format (has .Id), convert to UI format
          if (firstFile.hasOwnProperty('Id') && !firstFile.hasOwnProperty('id')) {
            filesToUpdate = ApperFileUploader.toUIFormat(memoizedExistingFiles);
          }
        }

        // Update files or clear field based on length
        if (filesToUpdate.length > 0) {
          await ApperFileUploader.FileField.updateFiles(config.fieldKey, filesToUpdate);
        } else {
          await ApperFileUploader.FileField.clearField(config.fieldKey);
        }

        existingFilesRef.current = memoizedExistingFiles;
      } catch (error) {
        console.error('Error updating files:', error);
        setError(error.message);
      }
    };

    updateFiles();
  }, [memoizedExistingFiles, isReady, config.fieldKey]);

  // Error UI
  if (error) {
    return (
      <div className="p-4 border-2 border-dashed border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center space-x-2 text-red-600">
          <ApperIcon name="AlertCircle" className="w-5 h-5" />
          <span className="text-sm font-medium">File Upload Error</span>
        </div>
        <p className="text-red-600 text-xs mt-1">{error}</p>
      </div>
    );
  }

return (
    <div className="w-full">
      {/* Main container with unique ID */}
      <div 
        id={`file-uploader-${elementId}`}
        className="min-h-[140px] border-2 border-dashed border-slate-300 hover:border-primary-400 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 transition-colors duration-200"
      >
        {/* Loading UI */}
        {!isReady && (
          <div className="flex flex-col items-center justify-center h-36 space-y-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <ApperIcon name="Upload" className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-primary-500 rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading file uploader...</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Supports all file types including images</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG, GIF, PDF, DOC, and more</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApperFileFieldComponent;