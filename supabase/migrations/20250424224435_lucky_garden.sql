-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create document analyses table
CREATE TABLE IF NOT EXISTS document_analyses (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  analysis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  parent_id INTEGER REFERENCES chat_messages(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_documents_created_at ON documents(created_at);
CREATE INDEX idx_document_analyses_document_id ON document_analyses(document_id);
CREATE INDEX idx_chat_messages_parent_id ON chat_messages(parent_id);