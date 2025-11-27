import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

export const fileService = {
  // Get all files
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "file_name_c"}},
          {"field": {"Name": "file_type_c"}},
          {"field": {"Name": "file_size_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "files_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('files_c', params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching files:", error?.response?.data?.message || error);
      return [];
    }
  },

  // Get file by ID
  async getById(fileId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "file_name_c"}},
          {"field": {"Name": "file_type_c"}},
          {"field": {"Name": "file_size_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "files_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      const response = await apperClient.getRecordById('files_c', fileId, params);
      
      if (!response?.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching file ${fileId}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  // Create file record
  async create(fileData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Convert files to API format if needed
      const { ApperFileUploader } = window.ApperSDK;
      const convertedFiles = ApperFileUploader.toCreateFormat(fileData.files_c);

      const params = {
        records: [{
          Name: fileData.file_name_c || fileData.name,
          file_name_c: fileData.file_name_c,
          file_type_c: fileData.file_type_c,
          file_size_c: fileData.file_size_c,
          upload_date_c: new Date().toISOString(),
          files_c: convertedFiles,
          Tags: fileData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord('files_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} file records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating file:", error?.response?.data?.message || error);
      return null;
    }
  },

  // Delete file
  async delete(fileId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = { 
        RecordIds: [fileId]
      };

      const response = await apperClient.deleteRecord('files_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} file records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      return false;
    } catch (error) {
      console.error("Error deleting file:", error?.response?.data?.message || error);
      return false;
    }
  }
};