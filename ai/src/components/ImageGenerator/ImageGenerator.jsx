import React, {
  useRef,
  useState,
} from "react";
import axios from "axios";
import "./ImageGenerator.css";
import defaultImage from "../assets/default_image.svg";
import {
  FaDownload,
  FaRandom,
} from "react-icons/fa"; // Import the random icon
import { motion } from "framer-motion";

const ImageGenerator = () => {
  const [image_url, setImage_url] =
    useState(defaultImage);
  let inputRef = useRef(null);
  const [loading, setLoading] =
    useState(false);
  const [isHovered, setIsHovered] =
    useState(false);

  const generateImage = async () => {
    const prompt =
      inputRef.current.value;
    if (!prompt) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          model: "dall-e-2",
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );

      const imageUrl =
        response.data.data[0].url;
      setImage_url(imageUrl);
    } catch (error) {
      console.error(
        "Error generating image:",
        error
      );
    }
    setLoading(false);
  };

  const fetchRandomPrompt =
    async () => {
      setLoading(true); // Set loading state while fetching the prompt
      try {
        const response =
          await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content:
                    "Write a very short description of an image, and also give it a category. For example: A colorful sunset over the ocean. (Nature/Landscape)",
                },
              ],
              temperature: 1,
              max_tokens: 50,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            },
            {
              headers: {
                "Content-Type":
                  "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              },
            }
          );

        const generatedPrompt =
          response.data.choices[0].message.content.trim();
        inputRef.current.value =
          generatedPrompt; // Set the input value to the generated prompt
      } catch (error) {
        console.error(
          "Error fetching random prompt:",
          error
        );
      } finally {
        setLoading(false); // Reset loading state
      }
    };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <motion.img
            src={image_url}
            alt="Generated"
            animate={{
              opacity: isHovered
                ? 0.8
                : 1,
              scale: isHovered
                ? 0.95
                : 1,
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              opacity: {
                duration: 0.8,
                ease: "easeInOut",
              },
              scale: {
                duration: 0.8,
                ease: "easeInOut",
              },
              delay: 0.5,
            }}
            onMouseEnter={() =>
              setIsHovered(true)
            }
            onMouseLeave={() =>
              setIsHovered(false)
            }
          />
          <a
            href={image_url}
            download
            className="download-icon"
            onMouseEnter={() =>
              setIsHovered(true)
            }
            onMouseLeave={() =>
              setIsHovered(false)
            }
          >
            <motion.div
              whileHover={{
                rotate: 360,
                scale: 1.2,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                display: "inline-block",
              }}
            >
              <FaDownload />
            </motion.div>
          </a>
        </div>
        <div className="loading">
          <div
            className={
              loading
                ? "loading-bar-full"
                : "loading-bar"
            }
          ></div>
          <div
            className={
              loading
                ? "loading-text"
                : "display-none"
            }
          >
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <div
          className="icon"
          onClick={fetchRandomPrompt}
        >
          <FaRandom />{" "}
          {/* Random icon */}
        </div>
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <div
          className="generate-btn"
          onClick={generateImage}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
