import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";
import React from "react";

export const taskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Handle empty results
      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response?.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

async create(taskData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // First create file record if files are attached
      let fileId = null;
      if (taskData.files && taskData.files.length > 0) {
        const { fileService } = await import('./fileService');
        const firstFile = taskData.files[0];
        
        const fileRecord = await fileService.create({
          file_name_c: firstFile.Name || firstFile.name,
          file_type_c: firstFile.Type || firstFile.type,
          file_size_c: firstFile.Size || firstFile.size,
          files_c: taskData.files
        });
        
        if (fileRecord) {
          fileId = fileRecord.Id;
        }
      }

      const params = {
        records: [{
          Name: taskData.title_c || taskData.title,
          title_c: taskData.title_c || taskData.title,
          description_c: taskData.description_c || taskData.description,
          priority_c: taskData.priority_c || taskData.priority,
          status_c: taskData.status_c || taskData.status,
          Tags: taskData.Tags || "",
          ...(fileId && { file_id_c: fileId })
        }]
      };

      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records: ${JSON.stringify(failed)}`);
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
      console.error("Error creating task:", error?.response?.data?.message || error);
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Filter to only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.title_c !== undefined || updates.title !== undefined) {
        updateData.title_c = updates.title_c || updates.title;
        updateData.Name = updates.title_c || updates.title;
      }
      if (updates.description_c !== undefined || updates.description !== undefined) {
        updateData.description_c = updates.description_c || updates.description;
      }
      if (updates.priority_c !== undefined || updates.priority !== undefined) {
        updateData.priority_c = updates.priority_c || updates.priority;
      }
      if (updates.status_c !== undefined || updates.status !== undefined) {
        updateData.status_c = updates.status_c || updates.status;
      }
      if (updates.Tags !== undefined) {
        updateData.Tags = updates.Tags;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records: ${JSON.stringify(failed)}`);
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
      console.error("Error updating task:", error?.response?.data?.message || error);
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length === 1;
      }
      return false;
    } catch (error) {
console.error("Error deleting task:", error?.response?.data?.message || error);
      return false;
    }
  }
};