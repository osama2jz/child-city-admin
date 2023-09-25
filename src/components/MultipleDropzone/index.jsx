import {
  Container,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { X } from "tabler-icons-react";
import { useStyles } from "./styles";
import Button from "../Button";

const MultipleDropzone = ({
  text = "Upload Images",
  subText,
  color,
  maxFiles = 1,
  form,
  fieldName,
  type = "image",
  coverImageEnabled = true,
}) => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const { classes } = useStyles();

  const [images, setImages] = useState([]);

  const [titleImage, setTitleImage] = useState(
    form?.values?.[fieldName]?.[0] || null
  );
  useEffect(() => {
    // Checking if the value is a string or an array
    if (typeof form?.values?.[fieldName] === "string") {
      setImages([form?.values?.[fieldName]] || []);
    } else {
      setImages(form?.values?.[fieldName] || []);
    }
  }, [form?.values?.[fieldName], form.values]);

  // Function to handle file selection
  const handleFileSelect = (files) => {
    files.forEach((obj, ind) => {
      if (obj.size > 24990000) {
        toast.error(`File Size exceeded 25MB.`);
        files = files.slice(ind-1, ind);
        return;
      }
    });
    if ([...images, ...files].length > maxFiles) {
      toast.error(`You can only upload ${maxFiles} files`);
      const remainingFiles = maxFiles - images.length;
      files = files.slice(0, remainingFiles);
    }
    files.forEach((file) => {
      file.preview = URL.createObjectURL(file);
    });

    files.forEach((file) => {
      if (images.includes(file)) {
        toast.error(`You can not upload same file`);
        return;
      }
    });
    setImages([...images, ...files]);
    setTitleImage(images[0] || files[0]);
    form.setFieldValue(fieldName, [...images, ...files]);
  };
  // Function to handle file deletion
  const handleFileDelete = (index) => {
    if (coverImageEnabled && titleImage === images[index]) {
      if (images.length === 1) {
        setTitleImage(null);
      } else {
        if (index === 0) {
          setTitleImage(images[1]);
        } else {
          setTitleImage(images[0]);
        }
      }
    }
    const newImages = images.filter((_, i) => i !== index);
    if (newImages.length === 0) {
      form.setFieldValue(fieldName, null);
      setImages(null);
    } else {
      form.setFieldValue(fieldName, newImages);
      setImages(newImages);
    }
  };

  const handleCoverImage = (image, index) => {
    if (coverImageEnabled) {
      setTitleImage(image);
      const newImages = images.filter((_, i) => i !== index);
      setImages([image, ...newImages]);
      form.setFieldValue(fieldName, [image, ...newImages]);
    }
  };

  const handleMimeType = () => {
    if (type === "image") {
      return [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.mp4];
    } else {
      return [...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE];
    }
  };
  const ImagePreview = ({ index, image }) => {
    console.log(image);
    return (
      <div
        style={{
          position: "relative",
        }}
        key={"image" + index}
      >
        <X
          color="white"
          className={classes.imageDeleteButton}
          onClick={() => handleFileDelete(index)}
        />
        {image.type === "application/pdf" ||
        (typeof image === "string" && image?.includes(".pdf")) ||
        image.type === "video/mp4" ? (
          <iframe
            style={{
              width: "100%",
              height: "100%",
              // minHeight: "500px",
            }}
            src={image?.preview || image}
            controls
          />
        ) : (
          <Image
            src={image?.preview || image}
            alt={image?.name}
            radius={10}
            style={{
              borderRadius: "10px",
              border: titleImage == image ? "3px solid #ff8087" : "none",
              cursor: coverImageEnabled && "pointer",
            }}
            onClick={() => {
              handleCoverImage(image, index);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <Container m={0} mt={20} p={0} fluid>
      <fieldset className={classes.fieldset}>
        <legend>
          <Text
            radius={"8px"}
            bg={color ? color : "#3A3A3A"}
            color={"white"}
            px={30}
            py={5}
            fw={600}
            fz={isMobile ? "sm" : "xl"}
            style={{
              borderRadius: "10px",
            }}
          >
            {text}
          </Text>
        </legend>

        <Flex
          direction={{
            xl: "row",
            lg: coverImageEnabled ? "column" : "row",
            md: "column",
            sm: "column",
            xs: "column",
            base: "column",
          }}
        >
          <Stack
            style={{
              flex: 1,
            }}
          >
            <Dropzone
              onDrop={handleFileSelect}
              onReject={(files) => {
                if (files[0].errors[0].code === "file-invalid-type") {
                  toast.error(`This file type is not supported`);
                } else {
                  toast.error(`You can only upload ${maxFiles} file(s)`);
                }
              }}
              maxFiles={maxFiles}
              style={{
                border: "1px solid dashed",
                borderRadius: "20px",
                "&:focusWithin": {
                  border: "1px solid #3A3A3A",
                },
              }}
              accept={handleMimeType()}
              mt={10}
            >
              <Group position={"center"} align={"center"}>
                <Group position="center">
                  {!isMobile && (
                    <Image width={isTablet ? 40 : 80} withPlaceholder />
                  )}
                  <Stack spacing={"0px"} align="center">
                    <Text
                      color="black"
                      align={"center"}
                      weight={400}
                      size={isMobile ? 16 : 18}
                    >
                      {subText}
                    </Text>

                    <Text
                      align={isMobile && "center"}
                      color="rgba(0, 0, 0, 0.4)"
                      weight={400}
                      size={isMobile ? 12 : 14}
                    >
                      The file should be in jpeg, png, mp4 format
                    </Text>
                    {form?.errors?.[fieldName] && (
                      <Text color="red" mt={10} size={isMobile ? "xs" : "sm"}>
                        {form?.errors?.[fieldName]}
                      </Text>
                    )}
                  </Stack>
                </Group>
              </Group>
            </Dropzone>

            <SimpleGrid
              cols={maxFiles === 1 ? 1 : 6}
              position="center"
              mt={20}
              breakpoints={[
                { maxWidth: "1000px", cols: 3, spacing: "md" },
                { maxWidth: "800px", cols: 2, spacing: "sm" },
              ]}
            >
              {images &&
                images?.map((image, index) => (
                  <ImagePreview
                    image={image}
                    index={index}
                    key={"image" + index + "key"}
                  />
                ))}
            </SimpleGrid>
          </Stack>

          <Flex
            direction={"column"}
            align="center"
            style={{
              display: coverImageEnabled && titleImage ? "flex" : "none",
            }}
            justify={"center"}
            pl={20}
          >
            <Text fw={"bold"} fz="xl">
              Cover Image
            </Text>
            <Image
              width={isMobile ? "100%" : 400}
              radius={10}
              src={(titleImage && titleImage?.preview) || titleImage}
              alt={titleImage && titleImage?.name}
            />
          </Flex>
        </Flex>
      </fieldset>
    </Container>
  );
};

export default MultipleDropzone;
