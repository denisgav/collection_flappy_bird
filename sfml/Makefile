# 1. Compiler and Core Flags
CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra -Werror -O2

# 2. SFML Libraries to Link
# Common modules: graphics, window, system. Add -lsfml-audio or -lsfml-network if needed.
SFML_LIBS := -lsfml-graphics -lsfml-window -lsfml-system

# 3. Directories & Target Output
TARGET    := flappy-bird
SRC_DIR   := src
OBJ_DIR   := obj

# 4. Source and Object File Discovery
SRCS      := $(wildcard $(SRC_DIR)/*.cpp)
OBJS      := $(SRCS:$(SRC_DIR)/%.cpp=$(OBJ_DIR)/%.o)

# 5. Default Rule (Builds the final executable)
all: $(TARGET)

# 6. Linking Target
$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) $^ -o $@ $(SFML_LIBS)

# 7. Compiling Source Files into Object Files
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp | $(OBJ_DIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# 8. Create Object Directory If It Doesn't Exist
$(OBJ_DIR):
	mkdir -p $(OBJ_DIR)

# 9. Clean Rule
.PHONY: clean
clean:
	rm -rf $(OBJ_DIR) $(TARGET)