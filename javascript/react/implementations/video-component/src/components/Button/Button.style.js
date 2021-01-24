export const ButtonOverrides = {
  BaseButton: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.primary,
        marginRight: "10px",
      };
    },
  },
  EndEnhancer: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.secondary,
      };
    },
  },
  LoadingSpinner: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.white,
      };
    },
  },
  LoadingSpinnerContainer: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.black,
      };
    },
  },
  StartEnhancer: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.secondary,
      };
    },
  },
};
