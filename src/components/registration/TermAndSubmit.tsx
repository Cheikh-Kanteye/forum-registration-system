import React, { memo } from "react";
import { TermsAndSubmitProps } from "@/types";

const TermsAndSubmit: React.FC<TermsAndSubmitProps> = memo(
  ({ step, getMaxSteps, isSubmittingState, onPrev }) => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <button
              type="button"
              className="px-6 py-2 border border-galien-blue text-galien-blue rounded-md transition-colors hover:bg-galien-blue/5"
              onClick={onPrev}
            >
              Précédent
            </button>
          )}
          <button
            type="submit"
            className={`btn-primary ${
              isSubmittingState ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmittingState}
          >
            {isSubmittingState ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Traitement en cours...
              </span>
            ) : step < getMaxSteps() ? (
              "Continuer"
            ) : (
              "Soumettre ma demande"
            )}
          </button>
        </div>
      </div>
    );
  }
);

export default TermsAndSubmit;
